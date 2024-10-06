"use client";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { NAVITEMS } from "@/constants/NavBar/Navitems";

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-background shadow-lg" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-medium">Bill Kato</h1>
        <div className="flex justify-end h-16">
          <div className="flex">
            {NAVITEMS.map((item, index) => (
              <div key={item.title} className="relative group">
                <Button
                  variant="ghost"
                  className="inline-flex items-center px-4 pt-1 text-sm font-medium h-16 relative group hover:bg-slate-100 rounded-xl"
                  onClick={() => toggleOpen(index)}
                >
                  {item.title}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </Button>
                {openIndex === index && (
                  <div
                    className={`absolute z-10 mt-2 w-56 rounded-xl shadow-lg bg-background ring-1 ring-black ring-opacity-5 ${
                      index === NAVITEMS.length - 1 ? "right-0" : "left-0"
                    }`}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {item.items.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 text-sm bg-white opacity-100 hover:bg-slate-100 rounded-xl"
                          role="menuitem"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

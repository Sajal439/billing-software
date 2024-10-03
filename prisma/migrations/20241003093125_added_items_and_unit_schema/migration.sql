-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currQty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unitId" TEXT NOT NULL,
    "altUnitId" TEXT,
    "altUnitConversion" DOUBLE PRECISION,
    "packaginUnitId" TEXT,
    "packagingUnitConversion" DOUBLE PRECISION,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_altUnitId_fkey" FOREIGN KEY ("altUnitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_packaginUnitId_fkey" FOREIGN KEY ("packaginUnitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

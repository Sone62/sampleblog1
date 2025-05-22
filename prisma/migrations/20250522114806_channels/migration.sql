-- CreateTable
CREATE TABLE "Channels" (
    "id" SERIAL NOT NULL,
    "X" DOUBLE PRECISION NOT NULL,
    "Y" DOUBLE PRECISION NOT NULL,
    "Z" INTEGER NOT NULL,
    "Type" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Items" TEXT NOT NULL,
    "Itemcategory" TEXT NOT NULL,
    "Desc" TEXT NOT NULL,
    "Postcode" TEXT NOT NULL,
    "Estatecode" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Building" TEXT NOT NULL,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

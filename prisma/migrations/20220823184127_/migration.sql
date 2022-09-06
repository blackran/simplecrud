-- CreateTable
CREATE TABLE "Device" (
    "dvc_id" SERIAL NOT NULL,
    "dvc_name" TEXT NOT NULL,
    "dvc_description" TEXT NOT NULL,
    "dvc_created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dvc_updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_user_id" INTEGER,
    "state_state_id" INTEGER,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("dvc_id")
);

-- CreateTable
CREATE TABLE "DeviceAction" (
    "dact_id" SERIAL NOT NULL,
    "dact_name" TEXT NOT NULL,
    "dact_description" TEXT NOT NULL,
    "dact_date" TEXT NOT NULL,
    "dact_created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dact_updated_at" TIMESTAMPTZ(3) NOT NULL,
    "device_dvc_id" INTEGER,

    CONSTRAINT "DeviceAction_pkey" PRIMARY KEY ("dact_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT,
    "user_lastname" TEXT,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_actived" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_dvc_name_key" ON "Device"("dvc_name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAction_dact_name_key" ON "DeviceAction"("dact_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_user_user_id_fkey" FOREIGN KEY ("user_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_state_state_id_fkey" FOREIGN KEY ("state_state_id") REFERENCES "State"("state_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAction" ADD CONSTRAINT "DeviceAction_device_dvc_id_fkey" FOREIGN KEY ("device_dvc_id") REFERENCES "Device"("dvc_id") ON DELETE SET NULL ON UPDATE CASCADE;

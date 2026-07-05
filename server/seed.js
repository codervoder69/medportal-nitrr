const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { dbConnect } = require("./Config/database");

const User = require("./Models/User");
const Medicine = require("./Models/Medicine");
const Notification = require("./Models/Notifications");
const Facility = require("./Models/Facilities");
const NearByHospital = require("./Models/NearByHospital");
const Gallery = require("./Models/Gallery");
const History = require("./Models/History");

const {
    students,
    medicines,
    facilities,
    hospitals,
    notifications,
    gallery
} = require("./seedData");

async function seed() {

    try {

        dbConnect();

        console.log("Connected to MongoDB");

        //-------------------------------------------------------
        // Find Admin
        //-------------------------------------------------------

        let admin = await User.findOne({ role: "Admin" });

        if (!admin) {

            admin = await User.findOne();

            if (!admin) {
                console.log("No users found.");
                console.log("Please register once and change role to Admin.");
                process.exit(0);
            }

            admin.role = "Admin";
            await admin.save();

            console.log("Existing user promoted to Admin.");
        }

        //-------------------------------------------------------
        // Remove old demo data
        //-------------------------------------------------------

        await Medicine.deleteMany({});
        await Notification.deleteMany({});
        await Facility.deleteMany({});
        await NearByHospital.deleteMany({});
        await Gallery.deleteMany({});
        await History.deleteMany({});

        await User.deleteMany({
            role: "Student",
            email: {
                $regex: "@nitrr.ac.in"
            }
        });

        console.log("Old demo data removed.");

        //-------------------------------------------------------
        // Create Students
        //-------------------------------------------------------

        const studentMap = {};

        for (const student of students) {

            const hashed = await bcrypt.hash(student.password, 10);

            const created = await User.create({

                name: student.name,
                email: student.email,
                password: hashed,
                role: "Student",
                roll: student.roll,

                age: student.age,
                bloodGroup: student.bloodGroup,

                mobileNo: student.mobileNo,

                fatherName: student.fatherName,
                fatherMobile: student.fatherMobile,

                address: student.address,

                previous_health: student.previous_health

            });

            studentMap[created.roll] = created;

        }

        console.log(`${Object.keys(studentMap).length} students created.`);

        //-------------------------------------------------------
        // Insert Medicines
        //-------------------------------------------------------

        const medicineDocs = [];

        for (const med of medicines) {

            const created = await Medicine.create({

                name: med.name,
                quantity: med.quantity,
                usage: med.usage,

                addedBy: admin._id

            });

            medicineDocs.push(created);

        }

        console.log(`${medicineDocs.length} medicines inserted.`);

        //-------------------------------------------------------
        // Insert Notifications
        //-------------------------------------------------------

        for (const title of notifications) {

            await Notification.create({

                title,

                addedBy: admin._id

            });

        }

        console.log("Notifications inserted.");

        //-------------------------------------------------------
        // Insert Facilities
        //-------------------------------------------------------

        for (const item of facilities) {

            await Facility.create({

                title: item.title,

                description: item.description,

                addedBy: admin._id

            });

        }

        console.log("Facilities inserted.")

                //-------------------------------------------------------
        // Insert Nearby Hospitals
        //-------------------------------------------------------

        for (const hospital of hospitals) {

            await NearByHospital.create({

                name: hospital.name,
                address: hospital.address,
                contact: hospital.contact,

                addedBy: admin._id

            });

        }

        console.log("Nearby Hospitals inserted.");

        //-------------------------------------------------------
        // Insert Gallery
        //-------------------------------------------------------

        for (const image of gallery) {

            await Gallery.create({

                link: image.link,

                addedBy: admin._id

            });

        }

        console.log("Gallery inserted.");

        //-------------------------------------------------------
        // Create Sample History
        //-------------------------------------------------------

        const studentList = Object.values(studentMap);

        const sampleHistory = [

            {
                student: studentList[0],
                medicines: [
                    {
                        name: "Paracetamol 500 mg",
                        requiredQuantity: "2"
                    },
                    {
                        name: "ORS Sachet",
                        requiredQuantity: "1"
                    }
                ]
            },

            {
                student: studentList[1],
                medicines: [
                    {
                        name: "Cetirizine",
                        requiredQuantity: "5"
                    }
                ]
            },

            {
                student: studentList[2],
                medicines: [
                    {
                        name: "Pantoprazole",
                        requiredQuantity: "7"
                    },
                    {
                        name: "Digene",
                        requiredQuantity: "4"
                    }
                ]
            },

            {
                student: studentList[3],
                medicines: [
                    {
                        name: "Ibuprofen",
                        requiredQuantity: "3"
                    }
                ]
            }

        ];

        //-------------------------------------------------------
        // Insert History + Update Stock
        //-------------------------------------------------------

        for (const item of sampleHistory) {

            await History.create({

                roll: item.student.roll,

                student: item.student._id,

                medicines: item.medicines

            });

            for (const med of item.medicines) {

                const medicine = await Medicine.findOne({
                    name: med.name
                });

                if (!medicine) continue;

                medicine.quantity =
                    Math.max(
                        0,
                        Number(medicine.quantity) -
                        Number(med.requiredQuantity)
                    );

                await medicine.save();

            }

        }

        console.log("History inserted.");

        //-------------------------------------------------------
        // Summary
        //-------------------------------------------------------

        console.log("");
        console.log("=======================================");
        console.log("Database Seed Completed Successfully");
        console.log("=======================================");

        console.log(`Students       : ${studentList.length}`);
        console.log(`Medicines      : ${medicineDocs.length}`);
        console.log(`Notifications  : ${notifications.length}`);
        console.log(`Facilities     : ${facilities.length}`);
        console.log(`Hospitals      : ${hospitals.length}`);
        console.log(`Gallery Images : ${gallery.length}`);
        console.log(`History Records: ${sampleHistory.length}`);

        console.log("");

        process.exit(0);

    }

    catch (err) {

        console.error(err);

        process.exit(1);

    }

}

seed();
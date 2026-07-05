import Runningcd from '../Components/RunningCode';
import HomeLowerBlock from '../Components/HomeLowerBlock';
import HomeSlider from '../Components/HomeSlider';
const Home=({showLoader,hideLoader})=>{


    const codeblock = `Visiting Consultants – NIT Raipur:

        🩺 Dr. Manjusha Agrawal (Gynaecologist)
        Tue – 11:30 AM to 1:30 PM

        🌿 Dr. V. Koshley (Dermatologist)
        Fri – 4:00 PM to 6:00 PM

        🩻 Dr. Yogesh Dhabarde (Physician)
        Mon – 4:00 PM to 6:00 PM

        🧠 Dr. Nishant Kumar Sahu (Psychiatrist)
        Wed – 4:00 PM to 6:00 PM

        🏥 Dr. B.P. Tripathi (Homeopathy)
        Mon, Wed, Thu, Sat – 2:00 PM to 5:00 PM
        `;

    return (
        <div className="flex flex-col mx-auto">
            <HomeSlider/>
            
            <div className='flex flex-row'>
                <Runningcd color={"text-blue-500"} codeblock={codeblock} backgroundGradient={"bg-gradient-to-r from-indigo-700 via-indigo-500 to-slate-500"}/>
                <div className="w-[70%] bg-gradient-to-r from-blue-100 via-blue-200 to-cyan-100 text-blue-900 p-6  shadow-md">
                    <h2 className="text-2xl font-bold mb-4 border-b border-blue-300 pb-2">Facilities at NIT Raipur Dispensary</h2>
                    <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                        <li>Free OPD consultation for all students and staff</li>
                        <li>Free distribution of essential medicines</li>
                        <li>Pathology room with diagnostic support</li>
                        <li>Dedicated consultant and visiting specialists</li>
                        <li>Free ambulance service for hospital referrals</li>
                        <li>MR claims reimbursement as per CGHS norms</li>
                        <li>Separate rooms for consultants and pathology</li>
                        <li>Staff room and comfortable waiting area</li>
                        <li>Regular visiting schedule for specialized care</li>
                        <li>Located conveniently opposite Nilgiri Apartments</li>
                    </ul>
                </div>

            </div>


            <HomeLowerBlock showLoader={showLoader} hideLoader={hideLoader}/>
        </div>
    )
}
export default Home;
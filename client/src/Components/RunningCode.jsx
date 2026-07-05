import { TypeAnimation } from 'react-type-animation';
const Runningcd=({color,codeblock,backgroundGradient})=>{
    return (
        <div className={`flex flex-row w-full md:w-[50%] gap-[2px] px-[2px] py-[14px] shadow-sm z-10 shadow-richblack-500 relative`}>
        <div className={`${backgroundGradient} h-[80%] w-[60%] items-center rounded-full -z-20 blur-3xl opacity-20 absolute`}></div>
            <div className='text-center flex flex-col w-[10%] text-blue-200 font-inter font-bold px-4'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${color}`}>
                <TypeAnimation 
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display: "inline-block",
                        }
                    }
                />
            </div>
        </div>

    )
}
export default Runningcd;
import { useState, useEffect } from "react";

const OtpInput = ({ input, handleChange, labelClassName }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    useEffect(() => {
        handleChange(otp.join(""), input);
    }, [otp]);

    const handleUpdate = (event, index) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);
        if (event.target.nextSibling) {
            event.target.nextSibling.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && index > 0 && otp[index] === "") {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            if (event.target.previousSibling) {
                event.target.previousSibling.focus();
            }
        }
    };

    const getLabelClassList = () => {
        let classes = "mb-2 ";
        classes += 0 ? "text-white " : " ";
        classes += labelClassName;
        return classes;
    };

    return (
        <div className="w-full">
            {input.label.length != 0 && (
                <label className={getLabelClassList()}>{input.label}</label>
            )}
            <div className="flex justify-center">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={value}
                        className="text-center w-12 h-12 border border-gray-300 rounded-lg mx-2 focus:outline-none focus:border-blue-500"
                        onChange={(event) => handleUpdate(event, index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpInput;

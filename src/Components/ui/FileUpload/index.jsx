import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

import Thumbnail from "./thumbnail";

const File = ({ input, handleChange, labelClassName }) => {
    const fileUpload = useRef(null);
    const dropRef = useRef(null);

    const getDivClassList = () => {
        let classList =
            "border-dashed border-2 border-border-base h-36 rounded flex " +
            "flex-col justify-center items-center cursor-pointer " +
            "focus:border-accent-400 focus:outline-none ";
        return classList;
    };

    const showFileUpload = () => {
        if (!input.multiple && input.data.length) {
            toast.error("You can upload only one file");
            return;
        }
        if (input.data.length === input.max) {
            toast.error("Maximum file count is " + input.max);
            return;
        }
        fileUpload.current.click();
    };

    const handleDrop = (event) => {
        event.preventDefault();

        if (!input.multiple && input.data.length) {
            toast.error("You can upload only one file");
            return;
        }
        if (input.data.length === input.max) {
            toast.error("Maximum file count is " + input.max);
            return;
        }

        const [file] = event.dataTransfer.files;
        if (file.type === "application/pdf") {
            const files = input.data;
            const key = files.length;
            const obj = { key: key, data: file };
            files.push(obj);

            handleChange(files, input);
        } else {
            toast.error("Please select a valid PDF file!");
        }
    };

    const handleDrag = (event) => {
        event.preventDefault();
    };

    const change = (e) => {
        if (!e.target.files[0]) return;

        if (e.target.files[0].type === "application/pdf") {
            const files = input.data;
            const key = files.length;
            const obj = { key: key, data: e.target.files[0] };
            files.push(obj);

            handleChange(files, input);
        } else {
            toast.error("Please select a valid PDF file!");
        }
    };

    const handleDeleteImg = (deleteImg) => {
        const images = input.data.filter((img) => img !== deleteImg);

        handleChange(images, input);
    };

    const getLabelClassList = () => {
        let classes = "mb-2 ";
        classes += 0 ? "text-white " : " ";
        classes += labelClassName;
        return classes;
    };

    return (
        <div className="w-full mb-5">
            {input.label.length != 0 && (
                <label className={getLabelClassList()}>
                    {input.label}
                    {input.required && (
                        <span className="text-red-500 ml-2">*</span>
                    )}
                </label>
            )}

            <div
                className="mt-2 p-5 md:p-8 bg-light shadow rounded"
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDrag}
            >
                <section className="upload">
                    <div
                        tabIndex={0}
                        className={getDivClassList()}
                        onClick={showFileUpload}
                    >
                        <input
                            type="file"
                            autoComplete="off"
                            tabIndex={-1}
                            className="hidden"
                            ref={fileUpload}
                            defaultValue=""
                            onChange={change}
                        />

                        <p className="text-body text-sm mt-4 text-center">
                            <span className="text-accent font-semibold mr-2">
                                Upload a PDF file
                            </span>
                            or drag and drop <br />
                        </p>
                    </div>
                    <div className="flex">
                        {input.data.map((img) => (
                            <Thumbnail
                                key={img.key}
                                img={img}
                                handleDelete={handleDeleteImg}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default File;

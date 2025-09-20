import React, { Fragment, useContext } from "react";
import { shoppingcontext } from "../../context";

const Carttile = ({ singleitem }) => {
    const { handleremove, handleaddcart } = useContext(shoppingcontext);

    return (
        <Fragment>
            <div className="grid grid-cols-3 items-start gap-5">
                <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-grid-400 p-1 rounded-sm">
                        <img
                            src={singleitem?.thumbnail}
                            className="w-full h-full object-contain"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">
                            {singleitem?.title}
                        </h3>
                        <button
                            onClick={() => handleremove(singleitem, true)}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
                        >
                            REMOVE
                        </button>
                    </div>
                </div>
                <div className="ml-auto">
                    <h3 className="text-lg font-bold text-gray-900">
                        ${singleitem?.totalPrice.toFixed(2)}
                    </h3>
                    <p className=" mt-2 mb-3 font-bold text-[16px]">
                        Quantity:{singleitem?.quantity}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <button
                            onClick={() => handleremove(singleitem, false)}
                            className="  disabled:opacity-65 px-3 py-1 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
                            disabled={singleitem?.quantity === 1}
                        >
                            -
                        </button>
                        <button
                            onClick={() => handleaddcart(singleitem)}
                            className="px-3 py-1 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-500" />
        </Fragment>
    );
};

export default Carttile;

import React from "react";

const AddNewRawMaterial = () => {



  return (
    <div className="flex items-center justify-center h-full my-2">
      <div className="m-auto max-w-7xl w-3/6 bg-green-200 p-2">
        <div className="mx-32 border-b-2 border-white mt-4">
          <div className="flex justify-start">
            <div className="font-semibold text-2xl">Supplier Dashboard</div>
          </div>
          <div className="flex space-x-2 my-6">
            <div className="flex justify-start mx-10">
              <div className="text-xl font-semibold">Add new item</div>
            </div>
          </div>
        </div>

        {/* body of the card */}
        <div className="flex w-full">
          <div className="w-1/2 flex justify-center items-center">
            {/* img */}
            <img
              className="h-40 w-40 object-cover"
              alt="Dish img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4QylJyu3MkOsKpfDgvDJaOJ2dsBaBAR5MG-1CCtSsHF6CAVB3nTl8nZJOAxgLR_PVCmU&usqp=CAU"
            />
          </div>
          <div className=" w-1/2 flex justify-start">
            {/* form */}
            <div>
              <div className="w-full">
                <div className="mt-0">Item Name</div>
                <input
                  type="text"
                  placeholder=""
                  name="dishname"
                  id="dishname"
                  className="p-1 border-white w-full"
                />
                <div className="mt-4">Units</div>
                <input
                  type="number"
                  placeholder=""
                  name="menu"
                  id="menu"
                  className="p-1 border-white w-full"
                />
                <div className="mt-4">Description</div>
                <input
                  type="text"
                  placeholder=""
                  name="description"
                  id="description"
                  className="p-1 border-white w-full"
                />
                <div className="mt-4">Price</div>
                <input
                  type="number"
                  placeholder=""
                  name="price"
                  id="price"
                  className="p-1 border-white w-full"
                />
              </div>
             
              <div className="bg-purple-500 text-white p-1 px-3 rounded-md text-sm mt-6">
                + Add Item
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewRawMaterial;

import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";

interface FlowerOrderFormData {
  patientName: string;
  roomNumber: string;
  senderName: string;
  cardMessage: string;
  flowerType: string;
}

// bare-bone basics for flower request form, template taken from tailwind
export default function FlowerService() {
  const flowerOrderData = [];
  const [displayedFlowerData, setDisplayedFlowerData] =
    useState<FlowerOrderFormData>({
      patientName: "",
      roomNumber: "",
      senderName: "",
      cardMessage: "",
      flowerType: "",
    });
  const [flowerOrder, setFlowerOrder] = useState<FlowerOrderFormData>({
    patientName: "",
    roomNumber: "",
    senderName: "",
    cardMessage: "",
    flowerType: "Roses - $13",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Saving of data
    flowerOrderData.push(flowerOrder);
    setDisplayedFlowerData(flowerOrder);
    //Clearing of form
    setFlowerOrder({
      patientName: "",
      roomNumber: "",
      senderName: "",
      cardMessage: "",
      flowerType: "Roses - $13",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Patient Name
            </label>
            <FormInput
              variant="flowers"
              id="grid-patient-name"
              type="text"
              value={flowerOrder.patientName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFlowerOrder({ ...flowerOrder, patientName: e.target.value })
              }
              placeholder="First Last"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-room-num"
            >
              Room Number
            </label>
            <FormInput
              variant="flowers"
              id="grid-room-num"
              type="number"
              value={flowerOrder.roomNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFlowerOrder({ ...flowerOrder, roomNumber: e.target.value })
              }
              placeholder="Enter room number..."
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-sender-name"
            >
              Sender Name
            </label>
            <FormInput
              variant="flowers"
              id="grid-sender-name"
              type="text"
              value={flowerOrder.senderName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFlowerOrder({ ...flowerOrder, senderName: e.target.value })
              }
              placeholder="First Last"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-message"
            >
              Message
            </label>
            <FormInput
              variant="flowers"
              id="grid-message"
              type="text"
              value={flowerOrder.cardMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFlowerOrder({ ...flowerOrder, cardMessage: e.target.value })
              }
              placeholder="Enter message (optional)"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 items-end">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-flower"
            >
              Type of Flower
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={flowerOrder.flowerType}
                id="grid-flower"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFlowerOrder({ ...flowerOrder, flowerType: e.target.value })
                }
              >
                <option>Roses - $13</option>
                <option>Lilies - $50</option>
                <option>Chrysanthemums - $1000</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <button
              className="bg-blue-900 hover:bg-transparent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded hover:rounded-none"
              type={"submit"}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <p>
        Patient Name: {displayedFlowerData.patientName} Room Number:{" "}
        {displayedFlowerData.roomNumber} Sender Name:{" "}
        {displayedFlowerData.senderName} Card Message:{" "}
        {displayedFlowerData.cardMessage} Flower Type:{" "}
        {displayedFlowerData.flowerType}
      </p>
    </>
  );
}

//----------------------------------------------------------------------------------------//

// FlowerServiceCards() will be a future implementation of the flower service request (will look cooler; see figma)
// function FlowerServiceCards() {
//   //add flower request here
//   return (
//     <div className="items-center bg-background flex flex-row space-x-2">
//       <div className="grid grid-cols-4 gap-4">
//         {availableFlowers.map((flower) => (
//           <div>
//             <img
//               className="max-h-full object-scale-down m-auto"
//               src={flower.imageSource}
//               alt="Picture of rose"
//             />
//             <label>{flower.flowerName}</label>
//           </div>
//         ))}
//       </div>
//       <Checkbox id="terms1" />
//       <div className="grid gap-1.5 leading-none">
//         <label
//           htmlFor="terms1"
//           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//         >
//           Roses
//         </label>
//       </div>
//     </div>
//   );
// }

// used in conjunction with FlowerServiceCards()
// const availableFlowers = [
//   {
//     flowerName: "Rose",
//     price: 15,
//     imageSource: "../../src/assets/rose.avif",
//   },
//   {
//     flowerName: "Tulip",
//     price: 12,
//     imageSource:
//       "https://images.wallpapersden.com/image/download/tulips-flowers-buds_aGttaGWUmZqaraWkpJRnamtlrWZrbWU.jpg",
//   },
// ];

// function openSheet() {
//   console.log("I've been clicked");
// }
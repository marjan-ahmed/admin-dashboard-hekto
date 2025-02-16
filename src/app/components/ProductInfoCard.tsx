import { Card } from "@/components/ui/card";

export default function ProductInfoCard({ heading, quantity }: { heading: string; quantity: number }) {
  return (
    <div className="p-2 flex justify-center">
      <Card className="w-[200px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl gap-2 h-auto sm:w-[280px] sm:h-[180px] p-4 flex flex-col justify-center items-center text-center shadow-md">
        <h2 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl">{heading}</h2>
        <p className="font-montserrat text-md sm:text-lg md:text-xl">{quantity}</p>
      </Card>
    </div>
  );
}

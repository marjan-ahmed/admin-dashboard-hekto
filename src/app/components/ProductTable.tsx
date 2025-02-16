// 'use client'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";
//   import { client } from "@/sanity/lib/client";
  
//   export default async function ProductTable() {
//     const query = `
//       *[_type == 'product']{
//         name, price, isFeaturedProduct, discountPercentage, category, stockLevel
//       }
//     `;
//     const data = await client.fetch(query);
  
//     return (
//       <div className="overflow-x-auto max-w-[1000px] mx-auto"> {/* Increased width */}
//         <Table className="text-base w-full border border-gray-300 shadow-md rounded-lg"> {/* More padding & shadow */}
//           <TableCaption className="text-base font-semibold">A list of available products.</TableCaption>
//           <TableHeader>
//             <TableRow className="h-10 bg-gray-100"> {/* More row height & background */}
//               <TableHead className="w-[250px] px-5 py-3 text-left">Product Name</TableHead>
//               <TableHead className="w-[180px] px-5 py-3 text-left">Category</TableHead>
//               <TableHead className="w-[100px] px-5 py-3 text-left">Price</TableHead>
//               <TableHead className="w-[100px] px-5 py-3 text-left">Discount (%)</TableHead>
//               <TableHead className="w-[150px] px-5 py-3 text-left">Stock Level</TableHead>
//               <TableHead className="text-right w-[100px] px-5 py-3">Featured</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.map((product: any, index: number) => (
//               <TableRow key={index} className="h-10 border-b hover:bg-gray-50 transition">
//                 <TableCell className="px-5 py-3">{product.name}</TableCell>
//                 <TableCell className="px-5 py-3">{product.category}</TableCell>
//                 <TableCell className="px-5 py-3">${product.price}</TableCell>
//                 <TableCell className="px-5 py-3">{product.discountPercentage}%</TableCell>
//                 <TableCell className="px-5 py-3">{product.stockLevel}</TableCell>
//                 <TableCell className="text-right px-5 py-3">
//                   {product.isFeaturedProduct ? "✅" : "❌"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     );
//   }
  
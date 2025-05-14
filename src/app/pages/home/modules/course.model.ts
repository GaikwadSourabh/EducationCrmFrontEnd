export interface Course
{
  _id?:string;
  name:string;
  description:string;
  originalPrice:number;
  discountPrice:number;
  updatedOn?:string;
  image:string;
}

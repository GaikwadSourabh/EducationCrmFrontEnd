export interface Feedback
{
  user_name:string;
  user_email:string;
  user_feedback:string;
  read_status:boolean;
  date_of_feedback?:Date;
}

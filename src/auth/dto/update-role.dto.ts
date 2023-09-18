import { PartialType } from "@nestjs/mapped-types";
import { SignUpDto } from "./signup.dto";   
import { IsEmpty } from "class-validator";
import { User } from "../schemas/user.schema";
import { LoginDto } from "./login.dto";
import { UpRoleDto } from "./up-role.dto copy";

export class UpdateRoleDto extends PartialType(UpRoleDto){

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User;

}
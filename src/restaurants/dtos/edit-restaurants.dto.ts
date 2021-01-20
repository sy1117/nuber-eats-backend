import { PartialType, InputType, ObjectType, Field } from "@nestjs/graphql";
import { CreateRestaurantInput } from "./create-restaurants.dto";
import { MutationOutput } from "src/common/dtos/output.dto";

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
    @Field(type => Number)
    restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends MutationOutput { }
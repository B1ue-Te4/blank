import readline from "readline";
import { VisualizeEntity } from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

const field = new Field;
field.entity[0][0][0] = 'yes'

console.log(VisualizeEntity(field.entity))
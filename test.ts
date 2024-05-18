import { Visualize2DArray} from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

const field = new Field;
const block = new Block_T;

field.loadBlock(block);
field.materialize();

import * as lines from './linesAction';
import * as form from './formAction';
import * as data from './dataActions';

export const actions = {
    ...lines,
    ...form,
    ...data,
}
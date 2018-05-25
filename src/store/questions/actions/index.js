import * as getQuestions from './getQuestions';
import * as setSelectedQuestionId from './setSelectedQuestionId';
import * as createQuestion from './createQuestion';

export default {
  ...getQuestions,
  ...setSelectedQuestionId,
  ...createQuestion,
};

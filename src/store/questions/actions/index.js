import * as getQuestions from './getQuestions';
import * as setSelectedQuestionId from './setSelectedQuestionId';
import * as createQuestion from './createQuestion';
import * as deleteQuestion from './deleteQuestion';

export default {
  ...getQuestions,
  ...setSelectedQuestionId,
  ...createQuestion,
  ...deleteQuestion,
};

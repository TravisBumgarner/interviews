import * as getMeasurements from './getMeasurements';
import * as deleteMeasurement from './deleteMeasurement';
import * as createMeasurement from './createMeasurement';

export default {
  ...getMeasurements,
  ...deleteMeasurement,
  ...createMeasurement,
};

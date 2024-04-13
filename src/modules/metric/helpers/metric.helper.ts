import {
  DistanceUnit,
  MetricType,
  MetricUnit,
  TemperatureUnit,
} from 'src/modules/metric/enums/metric.enum';
import { conversionFactor } from '../../../common/constants';
import { CommonErrorResponse } from 'src/common/utils';
import { MetricErrorMessage } from '../enums/error.enum';

export class MetricHelper {
  constructor() {}

  getMetricTypeByUnit = (unit: string): MetricType | null => {
    const distanceUnits = Object.values(DistanceUnit) as string[];
    const temperatureUnits = Object.values(TemperatureUnit) as string[];

    if (distanceUnits.includes(unit)) {
      return MetricType.DISTANCE;
    } else if (temperatureUnits.includes(unit)) {
      return MetricType.TEMPERATURE;
    } else {
      return null;
    }
  };

  addConvertMetricCondition = (targetUnit: MetricUnit) => {
    const condition = {
      $addFields: {
        convertedValue: {
          $switch: {
            branches: [
              {
                case: { $eq: ['$unit', `${MetricUnit.METER}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.METER}`][`${targetUnit}`],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.CENTIMETER}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.CENTIMETER}`][
                      `${targetUnit}`
                    ],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.INCH}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.INCH}`][`${targetUnit}`],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.FEET}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.FEET}`][`${targetUnit}`],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.YARD}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.YARD}`][`${targetUnit}`],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.CELSIUS}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.CELSIUS}`][`${targetUnit}`],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.FAHRENHEIT}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.FAHRENHEIT}`][
                      `${targetUnit}`
                    ],
                  ],
                },
              },
              {
                case: { $eq: ['$unit', `${MetricUnit.KELVIN}`] },
                then: {
                  $multiply: [
                    '$value',
                    conversionFactor[`${MetricUnit.KELVIN}`][`${targetUnit}`],
                  ],
                },
              },
            ],
            default: '$value',
          },
        },
      },
    };
    return condition;
  };

  validateTargetUnit(type: MetricType, targetUnit: MetricUnit) {
    const typeForTargetUnit = this.getMetricTypeByUnit(targetUnit);
    if (type !== typeForTargetUnit) {
      CommonErrorResponse(MetricErrorMessage.TARGET_UNIT_INVALID);
    }
  }
}

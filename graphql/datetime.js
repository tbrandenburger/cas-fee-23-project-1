const { GraphQLScalarType } = require('graphql');

const naiveIsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Data type representing the date and time',
  parseValue: (value) => {
    if (!naiveIsoDateRegex.test(value)) {
      throw new Error('Invalid date format');
    }

    return new Date(value);
  },
  serialize: (value) => {
    return value.toISOString();
  }
});

module.exports = {
  dateTimeScalar
};

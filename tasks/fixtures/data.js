/*
 * Package Import
 */
import faker from 'faker';
import config from 'config';

/*
 * Local Import
 */

/*
 * Config
 */
const { saltRounds } = config.get('Database');

/**
 * Random generator
 * @param  {Object} schema
 * @param  {Number} length
 * @return {Array}
 */
const generator = (schema, min = 0, max = 1) => {
  const length = faker.random.number({ min, max });

  /* eslint-disable arrow-body-style */
  return [...Array(length).keys()].map(() => {
    return Object.keys(schema).reduce((entity, key) => {
      entity[key] = faker.fake(schema[key]);

      return entity;
    }, {});
  });
  /* eslint-enable arrow-body-style */
};

/**
 * User schema
 * @param  {String} role - Role of the user
 * @return {Object}
 */
const getUserSchema = () => ({
  firstname: '{{name.firstName}}',
  lastname: '{{name.lastName}}',
});

/**
 * Message schema
 * @return {Object}
 */
const getMessageSchema = () => ({
  content: '{{lorem.paragraph}}',
});

/**
 * Generate users
 * @return {Array}
 */
export const getUsers = () => [
  ...generator(getUserSchema(), 5, 10),
];

/**
 * Generate messages (min 5, max 50)
 * @type {Array}
 */
export const messages = [...generator(getMessageSchema(), 5, 200)];

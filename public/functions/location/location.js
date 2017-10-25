import { noop } from 'lodash';

export const location = {
  name: 'location',
  type: 'location',
  help: 'Get the users location',
  fn: () => {
    return new Promise((resolve) => {
      function createLocation(geoposition) {
        const { latitude, longitude } = geoposition.coords;
        return resolve(
          {
            type: 'location',
            longitude,
            latitude,
          }
        );
      }
      return navigator.geolocation.getCurrentPosition(createLocation, noop, {
        maximumAge: 5000,
      });
    });
  },
};

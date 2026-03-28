function fn() {
  var config = {
    baseUrl: 'https://api.demoblaze.com'
  };

  try {
    config.RandomGenerator = Java.type('utils.RandomGenerator');
  } catch (e) {
    karate.log('Error al instanciar RandomGenerator:', e);
    throw e;
  }

  return config;
}
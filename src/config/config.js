const _config = {
    IMAGE_URL: '',
    ENVIRONMENT: '',
    APP_URL: '',
    API_URL: '',
    APP_NAME: '',
};
for (const envKey in process.env) {
    _config[envKey.replace('REACT_APP_', '')] = process.env[envKey];
}
export const Config = _config

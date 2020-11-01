const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'ultrasuperkey',
                tokenSecretKey: '',
                tokenExpiresIn: '1d'
            }
        case 'hom':
            return {
                bd_string: '',
                tokenSecretKey: 'ultrasuperkey',
                tokenExpiresIn: '1d'
            }
        case 'prd':
            return {
                bd_string: '',
                tokenSecretKey: 'ultrasuperkey',
                tokenExpiresIn: '1d'
            }
    }
};

module.exports = config();
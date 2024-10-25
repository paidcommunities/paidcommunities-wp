import * as api from './api';
import * as components from './components';

// Export for ES modules
export {
    api,
    components
};

// Export for global/UMD
const paidcommunities = {
    api,
    components
};

export default paidcommunities;
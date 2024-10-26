import * as api from './api/src';
import * as components from './components/src';

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
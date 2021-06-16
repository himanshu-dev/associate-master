import moment from "moment";
import {Config} from "../../config/config";

export default class Utils {

    static getFormattedDate(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY, h:mm A');
    }

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getVersion() {
        const v = Config.version;
        return `${v.majorRevision}.${v.minorRevision}.${v.bugFixes}`
    }

}

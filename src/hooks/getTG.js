export const getTG = (local_city) => {
    if (local_city == 'msk') {
        return 'https://t.me/RabotaRDmoscow';
    }
    if (local_city == 'spb') {
        return 'https://t.me/RabotaSPBrd';
    }
    if (local_city == 'nn') {
        return 'https://t.me/RabotaNNovRD';
    }

    if (local_city == 'oms') {
        return 'https://t.me/RabotaOmskRD';
    }
    if (local_city == 'smr') {
        return 'https://t.me/RabotaSamaraRD';
    }
    if (local_city == 'rst') {
        return 'https://t.me/RabotaRostovnaDonuRD';
    }
    if (local_city == 'kzn') {
        return 'https://t.me/RabotaKazanRD';
    }
    if (local_city == 'ufa') {
        return 'https://t.me/RabotaUfaRD';
    }
    if (local_city == 'prm') {
        return 'https://t.me/RabotaPermRD';
    }
    if (local_city == 'vrn') {
        return 'https://t.me/RabotaVoronegRD';
    }

    return 'https://t.me/RabotaNNovRD';
};

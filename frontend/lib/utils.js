export function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num ? num.toString() : '0';
}

export function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

export function getStatusColor(status) {
    switch (status) {
        case 'open': return 'badge-primary';
        case 'solved': return 'badge-success';
        case 'in-progress': return 'badge-warning';
        case 'closed': return 'badge-danger';
        default: return 'badge-primary';
    }
}

export function getPriorityColor(priority) {
    switch (priority) {
        case 'high': return 'text-red-500';
        case 'medium': return 'text-amber-500';
        case 'low': return 'text-green-500';
        default: return 'text-slate-500';
    }
}

export function truncate(str, length = 150) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
}

export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

export function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export function getLevelColor(level) {
    switch (level) {
        case 'Legend': return 'text-amber-500';
        case 'Master': return 'text-purple-500';
        case 'Expert': return 'text-blue-500';
        case 'Rising Star': return 'text-emerald-500';
        case 'Contributor': return 'text-cyan-500';
        case 'Learner': return 'text-slate-500';
        default: return 'text-slate-500';
    }
}

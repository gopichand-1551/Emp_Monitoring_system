import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, trend, gradient = 'primary' }) => {
    return (
        <div className={`stat-card stat-card-${gradient}`}>
            <div className="stat-content">
                <div className="stat-header">
                    <span className="stat-title">{title}</span>
                    {Icon && (
                        <div className="stat-icon">
                            <Icon size={24} />
                        </div>
                    )}
                </div>
                <div className="stat-value">{value}</div>
                {trend && (
                    <div className={`stat-trend ${trend.direction}`}>
                        <span>{trend.value}</span>
                        <span className="stat-trend-label">{trend.label}</span>
                    </div>
                )}
            </div>
            <div className="stat-bg-glow"></div>
        </div>
    );
};

export default StatCard;

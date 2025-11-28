import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Clock, Shield, Users, ClipboardCheck, BarChart3, Bell } from 'lucide-react';
import './LandingPage.css';
import Footer from '../components/Footer';
import cnLogo from '../assets/cn-logo.jpg';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/admin/login');
    };

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesOptions = {
        fullScreen: {
            enable: false
        },
        background: {
            color: {
                value: "transparent"
            }
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8
                }
            }
        },
        particles: {
            color: {
                value: ["#A020F0", "#C850FF", "#8B3DFF", "#D896FF"]
            },
            links: {
                color: "#A020F0",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
                triangles: {
                    enable: true,
                    color: "#A020F0",
                    opacity: 0.1
                }
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out"
                },
                random: true,
                speed: 1.5,
                straight: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            },
            number: {
                density: {
                    enable: true,
                    area: 600
                },
                value: 250
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.3,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 1,
                    sync: false
                }
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1
                }
            }
        },
        detectRetina: true
    };

    const guidelines = [
        {
            icon: Clock,
            title: 'Real-Time Monitoring',
            description: 'Track employee activities and work hours in real-time with automated timestamp logging.',
            color: '#00d7ff'
        },
        {
            icon: Users,
            title: 'Employee Management',
            description: 'Add, edit, and manage employee records with comprehensive profile information.',
            color: '#A855F7'
        },
        {
            icon: ClipboardCheck,
            title: 'Task Tracking',
            description: 'Monitor daily tasks, set priorities, and track completion status across teams.',
            color: '#10B981'
        },
        {
            icon: Shield,
            title: 'Leave Management',
            description: 'Review and approve leave requests with full visibility of team availability.',
            color: '#F59E0B'
        },
        {
            icon: BarChart3,
            title: 'Performance Insights',
            description: 'Generate reports and analyze employee performance with visual dashboards.',
            color: '#3B82F6'
        },
        {
            icon: Bell,
            title: 'Instant Notifications',
            description: 'Stay updated with pending requests, tasks, and important system alerts.',
            color: '#EC4899'
        }
    ];

    return (
        <div className="landing-page">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
                className="particles-background"
            />

            <div className="landing-content">
                <div className="logo-container">
                    <img src={cnLogo} alt="Cogninode Technologies" className="landing-logo" />
                </div>

                <h1 className="landing-title">
                    Welcome to <span className="brand-name">Cogninode Technologies</span>
                </h1>

                <p className="landing-subtitle">Smart Employee Monitoring System</p>

                <button className="landing-login-btn" onClick={handleLoginClick}>
                    Login →
                </button>
            </div>

            <div className="guidelines-section">
                <h2 className="guidelines-title">Admin Guidelines</h2>
                <p className="guidelines-subtitle">Key features for efficient workforce management</p>

                <div className="guidelines-grid">
                    {guidelines.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="guideline-card">
                                <div className="guideline-icon" style={{ color: item.color }}>
                                    <Icon size={40} />
                                </div>
                                <h3 className="guideline-title">{item.title}</h3>
                                <p className="guideline-description">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;

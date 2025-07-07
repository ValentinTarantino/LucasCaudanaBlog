import { useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './NewsCard.css';

const NewsCard = ({ article, index, onEdit, onDelete }) => {
    const cardRef = useRef(null);

    // Lógica para el efecto 3D holográfico
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        const rotateX = (y / height) * -20;
        const rotateY = (x / width) * 20;
        const glareX = (x + width / 2) / width * 100;
        const glareY = (y + height / 2) / height * 100;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
        <Draggable draggableId={article.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        className={`holo-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="holo-card__content">
                            <div className="holo-card__glare"></div>
                            {article.image && (
                                <div className="holo-card__image-container">
                                    <img src={article.image} className="holo-card__image" alt={article.title} />
                                </div>
                            )}
                            <div className="holo-card__body">
                                <div className="holo-card__categories mb-2">
                                    {article.categories?.map(cat => (
                                        <span key={cat} className="badge me-1">{cat}</span>
                                    ))}
                                </div>

                                <h5 className="holo-card__title">{article.title}</h5>
                                <p className="holo-card__description">{article.description}</p>
                                <div className="holo-card__actions text-end">
                                    <button className="btn btn-sm me-2" onClick={() => onEdit(article)}>Editar</button>
                                    <button className="btn btn-sm" onClick={() => onDelete(article.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default NewsCard;

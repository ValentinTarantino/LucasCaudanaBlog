import { Droppable } from '@hello-pangea/dnd';
import NewsCard from '../NewsCard/NewsCard';
import './NewsGrid.css';

const NewsGrid = ({ news, onEdit, onDelete }) => {
    if (news.length === 0) {
        return (
            <div className="placeholder-empty-grid">
                <h4>No hay noticias todavía.</h4>
                <p>¡Hace click en "Añadir Nueva Noticia" para empezar!</p>
            </div>
        );
    }

    return (
        <Droppable droppableId="news-grid">
            {(provided) => (
                <div
                    className="news-grid-masonry"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {news.map((article, index) => (
                        <NewsCard
                            key={article.id}
                            article={article}
                            index={index}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default NewsGrid;
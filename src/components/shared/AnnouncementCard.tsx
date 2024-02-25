import { IAnnouncement } from "@/types";

type AnnouncementProps = {
    announcement: IAnnouncement;
};

const AnnouncementCard = ({ announcement }: AnnouncementProps) => {
    return (
        <div className="card-container">
            <div className="content-container">
                <h3>
                    {announcement?.baslik || 'Haber Başlığı'}
                </h3>
                <hr className='comments-divider' />
                <p className="announcement-content" dangerouslySetInnerHTML={{ __html: announcement?.icerik || 'Haber İçeriği' }}></p>
            </div>
        </div>
    );
};

export default AnnouncementCard;
import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkIsLiked } from "@/lib/utils";
import {
    useLikePost,
    useSavePost,
    useDeleteSavedPost,
    useGetCurrentUser,
} from "@/lib/react-query/queries";


type PostStatsProps = {
    post: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likesList = post.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
    );

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);

    const handleLikePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    };

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavePost(savedPostRecord.$id);
        }

        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
    };

    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";

    {/* edit furkan */ }

    const [showTextInput, setShowTextInput] = useState(false);

    const handleToggleTextInput = () => {
        setShowTextInput(!showTextInput);
    };


    {/* // edit furkan */ }

    return (
        <div
            className={`flex justify-between items-center z-20 ${containerStyles}`}>



            <div className="flex">

                <div className="flex gap-2 mr-5">
                    <img
                        src={`${checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"
                            }`}
                        alt="like"
                        width={20}
                        height={20}
                        onClick={(e) => handleLikePost(e)}
                        className="cursor-pointer mt-1 mb-5"
                    />
                    <p className="small-medium lg:base-medium">{likes.length}</p>
                </div>





                {/* BURADA YORUM İÇİN BUTON EKLEMESİ YAPTIM
        LİKE VE YORUM BUTONUNU BİR DİV İÇERİSİNDE BİRLEŞTİRDİM. KAYDET BUTONU AYRI VE SAĞDA KALMASI İÇİN (FURKAN) */}

                <div className="flex gap-2 mr-5">
                    <img
                        src={`${"/assets/icons/comment.svg"}`}
                        alt="comment"
                        width={20}
                        height={20}
                        onClick={(e) => handleToggleTextInput(e)}
                        className="cursor-pointer mt-1 mb-5"
                        position="relative"
                    />
                    <p className="small-medium lg:base-medium">{likes.length}</p>
                    {showTextInput && (
                        <div className="flex">

                            <input
                                type="text"
                                placeholder="Yorum Ekle..."
                                style={{
                                    width: '300px',
                                    height: '30px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '2px solid #5FA0FF',
                                    color: "black",
                                    marginLeft: "33px",
                                }} />
                            <img
                                src={`${"/assets/icons/send-comment.svg"}`}
                                alt="comment"
                                width={30}
                                height={30}
                                onClick={(e) => handleToggleTextInput(e)}  //* Bu kısımdaki fonksiyon ismi değişecek
                                className="cursor-pointer mb-3"

                            />
                        </div>
                    )}

                </div>




                {/* BURASI BENİM KODUN SONU FURKAN eğer silersen alttaki kapatma divinide üsttekiyle beraber sil */}

            </div>



            <div className="flex gap-2">
                <img
                    src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer mt-1 mb-5"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};

export default PostStats;

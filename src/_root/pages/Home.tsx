import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard } from "@/components/shared";
import { useGetRecentPosts, useImportantAnnouncements } from "@/lib/react-query/queries";
import { Key } from "react";
import AnnouncementCard from "@/components/shared/AnnouncementCard";

const Home = () => {
  // const { toast } = useToast();

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: announcements,
    isLoading: isAnnouncementLoading,
    isError: isErrorAnnouncements,
  } = useImportantAnnouncements();

  if (isErrorPosts || isErrorAnnouncements) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Birşeyler ters gitti</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Birşeyler ters gitti</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Ana Gönderiler</h2>
          {
            isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )
          }
        </div >
      </div >

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Önemli Duyurular</h3>
        {
          isAnnouncementLoading && !announcements ? (
            <Loader />
          ) : (
            <ul className="">
              {announcements?.map((announcement: any, index: Key | null | undefined) => (
                <li key={index}>
                  <AnnouncementCard announcement={announcement} />
                </li>
              ))}
            </ul>
          )
        }
      </div >
    </div >
  );
};

export default Home;

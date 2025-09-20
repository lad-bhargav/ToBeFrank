export default function Post({id,profilepic,username,contentText,contentImg}){
    return(
        <div className="postCard h-auto w-[60vh] rounded-md p-5 shadow-2xl mt-7">
            <div className="top h-[15%] w-full flex items-center gap-2">
                <div className="h-[45px] w-[45px] overflow-hidden text-center rounded-full"><img src={profilepic} alt="?" className="h-full w-full bg-white object-cover"/></div>
                <p className="font-semibold text-lg">{username}</p>
            </div>
            <div className="remain h-[85%] w-full flex flex-col gap-2 mt-2">
                <p className="text-md font-normal">{contentText}</p>
                <div className="h-[80%] w-full bg-red-500">
                    <img src={contentImg} alt="no image" />
                </div>
            </div>
        </div>
    );
}
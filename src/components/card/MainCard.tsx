import { Board } from "@/pages/api/postList";
import { convertDateFormat, getTimeDifference } from "@/utils/dateUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { PostCategory } from "../catogory/PostCategory";

export const MainCard = ({
  createdAt,
  postId,
  title,
  content,
  creator,
  category,
  viewCount,
  commentCount,
  onClick = () => {},
}: Board) => {
  return (
    <Card
      onClick={() => onClick(postId)}
      className="flex flex-col h-[295px] rounded-lg overflow-hidden justify-between shadow-lg  bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        padding: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#B666AE",
              marginRight: "5px",
            }}
          />
          <p className="leading-7">{creator}</p>
        </div>
        {createdAt !== null && (
          <span
            style={{
              color: "#64748B",
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            {getTimeDifference(createdAt)}
          </span>
        )}
      </div>

      <div className="py-4">
        <div className="h-[56px] mb-[15px] line-clamp-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
          </h4>
        </div>
        <div className=" text-gray-800 text-base mb-4 line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className="gap-2 flex flex-row items-center"
          style={{ paddingBottom: 0, justifyContent: "space-between" }}
        >
          <div className="flex flex-row items-center">
            <Image
              src={require("../../../assets/image/viewIcon.png")}
              alt="buttonImage"
              style={{ width: "22px", height: "22px", marginRight: "7px" }}
            />

            <span
              className="inline-block rounded-full"
              style={{ marginRight: "20px", fontSize: 14 }}
            >
              {viewCount}
            </span>

            <Image
              src={require("../../../assets/image/commentIcon.png")}
              alt="buttonImage"
              style={{ width: "22px", height: "22px", marginRight: "7px" }}
            />

            <span
              className="inline-block rounded-full"
              style={{
                fontSize: 14,
              }}
            >
              {commentCount}
            </span>
          </div>
          <PostCategory
            category={category}
            className="w-[100px] h-[30px] custom-font-additional"
          />
        </div>
      </div>
    </Card>
  );
};

// /* feed-card */

// position: absolute;
// width: 487px;
// height: 295px;
// left: 40px;
// top: 1946px;

// background: #FFFFFF;
// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// border-radius: 12px;

// /* 컨텐츠 */

// box-sizing: border-box;

// position: absolute;
// width: 447px;
// height: 255px;
// left: 20px;
// top: 20px;

// background: #FFFFFF;

// /* 통계 */

// position: absolute;
// width: 128px;
// height: 24px;
// left: 0px;
// top: 231px;

// /* Group 99 */

// position: absolute;
// width: 54px;
// height: 24px;
// left: 0px;
// top: 231px;

// /* icon */

// position: absolute;
// width: 24px;
// height: 24px;
// left: 0px;
// top: 231px;

// /* Bounding box */

// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;

// background: #D9D9D9;

// /* visibility */

// position: absolute;
// left: 8.65%;
// right: 8.65%;
// top: 20.83%;
// bottom: 25%;

// background: #000000;

// /* 100 */

// position: absolute;
// width: 25px;
// height: 20px;
// left: 29px;
// top: 233px;

// /* subtitle */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 20px;
// /* identical to box height, or 143% */

// color: #000000;

// /* Group 100 */

// position: absolute;
// width: 54px;
// height: 22px;
// left: 74px;
// top: 233px;

// /* icon */

// position: absolute;
// width: 22px;
// height: 22px;
// left: 74px;
// top: 233px;

// /* Bounding box */

// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;

// background: #D9D9D9;

// /* sms */

// position: absolute;
// left: 12.5%;
// right: 12.5%;
// top: 12.5%;
// bottom: 16.35%;

// background: #000000;

// /* 100 */

// position: absolute;
// width: 25px;
// height: 20px;
// left: 103px;
// top: 233px;

// /* subtitle */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 20px;
// /* identical to box height, or 143% */

// color: #000000;

// /* post-category */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 8px 25px;
// gap: 10px;

// position: absolute;
// width: 100px;
// height: 30px;
// left: 347px;
// top: 225px;

// /* slate-500 */
// background: #64748B;
// border-radius: 50px;

// /* Question */

// width: 51px;
// height: 14px;

// /* addtional */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 14px;
// /* identical to box height, or 117% */
// display: flex;
// align-items: center;

// /* slate-100 */
// color: #F1F5F9;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* 이것은 본문의 일부입니다. 글의 상단에 적절한 내용을 적는다면 카드에 노출되어 더 많은 사람들의 관심을받을 수 있습니다. */

// position: absolute;
// left: 0.45%;
// right: 0.44%;
// top: 55.29%;
// bottom: 29.02%;

// /* subtitle */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 20px;
// /* or 143% */

// color: #000000;

// /* 이것은 제목입니다. 제목은 최대 두줄까지 보여지는 것이 좋을 것 같습니다. */

// position: absolute;
// left: 0%;
// right: 0.45%;
// top: 23.53%;
// bottom: 54.51%;

// /* h4 */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 600;
// font-size: 20px;
// line-height: 28px;
// /* or 140% */
// display: flex;
// align-items: center;
// letter-spacing: -0.005em;

// color: #000000;

// /* 카드헤더 */

// position: absolute;
// width: 462.18px;
// height: 40px;
// left: 0px;
// top: 0px;

// /* icon */

// position: absolute;
// width: 36px;
// height: 36px;
// left: 426.18px;
// top: 2px;

// /* Bounding box */

// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;

// background: #D9D9D9;

// /* more_vert */

// position: absolute;
// left: 47.22%;
// right: 44.44%;
// top: 22.22%;
// bottom: 23.29%;

// background: #1C1B1F;

// /* 1 m ago */

// position: absolute;
// width: 44px;
// height: 14px;
// left: 382px;
// top: 13px;

// /* addtional */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 12px;
// line-height: 14px;
// /* identical to box height, or 117% */
// display: flex;
// align-items: center;

// /* slate-500 */
// color: #64748B;

// /* user */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 0px;
// gap: 5px;

// position: absolute;
// width: 139px;
// height: 40px;
// left: 0px;
// top: 0px;

// /* Ellipse 1 */

// width: 40px;
// height: 40px;

// background: #B666AE;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* bluecoconut */

// width: 94px;
// height: 28px;

// /* p */
// font-family: 'Inter';
// font-style: normal;
// font-weight: 400;
// font-size: 16px;
// line-height: 28px;
// /* identical to box height, or 175% */

// color: #000000;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

export default MainCard;

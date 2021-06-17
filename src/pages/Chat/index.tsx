import { FC, useEffect, useState } from "react";
import { GridContent } from "@ant-design/pro-layout";
import { ChatContainer } from "./components";
import { CometChat } from "@cometchat-pro/chat";
import { connect, Dispatch } from "umi";
import { Spin } from "antd";
import { AccountT } from "../Account/data";
type Props = {
  dispatch: Dispatch;
  accountInfo: any;
};

const Chatting: FC<Props> = ({ accountInfo }) => {
  const appID = "1893053a8ed743f2";
  const region = "us";
  const authKey = "6d93902f53e46d0bd5c7a1aa32ae11dfce5e84a2";
  const [authentication, setAuthentication] = useState(false);
  useEffect(() => {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        // console.log("Initialization completed successfully");
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
    const uid = accountInfo?.data?.idUser;
    CometChat.login(uid, authKey).then(
      (user) => {
        setAuthentication(true);
        // console.log("Login Successful:", { user });
      },
      (error) => {
        console.log("Login failed with exception:", { error });
      }
    );
  }, [accountInfo]);

  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content h--550">
          {authentication ? <ChatContainer /> : <Spin spinning className="center-a-div"></Spin>}
        </div>
      </div>
    </GridContent>
  );
};

export default connect(({ account }: { account: AccountT }) => ({
  accountInfo: account.detailAccount,
}))(Chatting);

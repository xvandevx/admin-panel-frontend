import MainLayout from "~/components/layouts/main";
import Backup from "~/components/pages/backup";

export default function Blog() {
    return (
        <MainLayout isShowAdd={false}>
            <Backup/>
        </MainLayout>
    )
}

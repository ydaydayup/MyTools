import subprocess
import sys


def pull_and_save_docker_image(image_name, architecture):
    try:
        # 拉取镜像
        print(f"正在拉取镜像：{image_name}")
        cmd_pull = ["docker", "pull", image_name, "--platform", architecture]
        subprocess.run(cmd_pull, check=True)

        print(f"镜像 {image_name} 已成功拉取。")

        # 保存镜像为 tar 文件，文件名以镜像名命名
        output_filename = f"{image_name.replace(':', '_').replace('/', '_')}.tar"  # 替换冒号为下划线，并添加.tar后缀
        print(f"正在保存镜像到文件：{output_filename}")
        cmd_save = ["docker", "save", "-o", output_filename, image_name]
        subprocess.run(cmd_save, check=True)

        print(f"镜像已成功保存为：{output_filename}")
    except subprocess.CalledProcessError as e:
        print(f"操作失败：{e}", file=sys.stderr)
    except Exception as e:
        print(f"发生错误：{e}", file=sys.stderr)


def main():
    # 获取用户输入
    image_names = [
        "supabase/studio:20241202-71e5240",
        # "kong:2.8.1",
        # "supabase/gotrue:v2.164.0",
        # "postgrest/postgrest:v12.2.0",
        # "supabase/realtime:v2.33.70",
        # "supabase/storage-api:v1.11.13",
        # "darthsim/imgproxy:v3.8.0",
        # "supabase/postgres-meta:v0.84.2",
        # "supabase/edge-runtime:v1.65.3",
        # "supabase/logflare:1.4.0",
        # "supabase/postgres:15.6.1.146",
        "timberio/vector:0.28.1-alpine",
        "supabase/supavisor:1.1.56",
    ]
    for image_name in image_names:
        # image_name = "supabase/studio:20241202-71e5240"
        # architecture = input("请输入系统架构（例如：amd64, arm64）：")
        architecture = "amd64"
        # 拉取镜像
        pull_and_save_docker_image(image_name, architecture)


if __name__ == "__main__":
    main()

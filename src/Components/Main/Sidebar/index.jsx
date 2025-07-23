import { useLocation } from "react-router-dom";
import { Logo } from "../../Common/Logo";
import { sidebarLink } from "../../../RouteLinks";
import {
  AppSideBar,
  AppSidebarInside,
  AppSidebarLinkCover,
  SidebarItem,
  SidebarTitle,
  SidebarList,
  SidebarListItem,
  SidebarLinkStyled,
} from "./style";

const normalizePath = (path) =>
  path?.startsWith("/") ? path : `/apps/${path}`;
const isDashboardPath = (path) =>
  path === "/apps" || path === "apps" || path === "/apps/";
const isLinkActive = (currentPath, linkPath) =>
  currentPath === linkPath || currentPath.startsWith(linkPath + "/");

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <AppSideBar>
      <AppSidebarInside>
        <Logo />
        <AppSidebarLinkCover>
          {sidebarLink.map((item) => {
            const sectionIsActive = item.children?.some(({ path }) => {
              if (!path) return false;

              const normalizedPath = normalizePath(path);
              return isDashboardPath(normalizedPath)
                ? pathname === "/apps"
                : isLinkActive(pathname, normalizedPath);
            });

            return (
              <SidebarItem key={item.id} $expanded={sectionIsActive}>
                <SidebarTitle>{item.title}</SidebarTitle>
                <SidebarList>
                  {item.children?.map(({ id, path, title, icon: Icon }) => {
                    if (!path) return null;

                    const linkPath = normalizePath(path);
                    const active = isDashboardPath(linkPath)
                      ? pathname === "/apps"
                      : isLinkActive(pathname, linkPath);

                    return (
                      <SidebarListItem key={id} $active={active}>
                        <SidebarLinkStyled to={linkPath}>
                          {Icon && <Icon />} <p>{title}</p>
                        </SidebarLinkStyled>
                      </SidebarListItem>
                    );
                  })}
                </SidebarList>
              </SidebarItem>
            );
          })}
        </AppSidebarLinkCover>
      </AppSidebarInside>
    </AppSideBar>
  );
};

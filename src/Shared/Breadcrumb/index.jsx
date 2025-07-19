import {
  BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbText,
  BreadcrumbLink,
} from "./style";

export const Breadcrumb = ({ items, separator = "/" }) => {
  return (
    <BreadcrumbNav aria-label="breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbText>{item.label}</BreadcrumbText>
              ) : (
                <BreadcrumbLink to={item.path}>{item.label}</BreadcrumbLink>
              )}
              {!isLast && <>{separator}</>}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

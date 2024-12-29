import { ChangeEvent, FC } from 'react';
import { ITopMenu } from '../../../models/ITopMenu';
import MenuItemPermissions from './MenuItemPermissions';
import Input from '../Main/Input';
import debounce from 'lodash.debounce';
import { useAppSelector } from '../../../hooks/redux';
import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import { UserRoles } from '../../../utils/userRoles.ts';

interface TopMenuPermissionsProps {
  menu?: ITopMenu[];
  fetchData: (replace: boolean, {
    role,
    search,
    archive,
    access,
    trustLesson,
    testUser
  }: {
    role?: string;
    search?: string,
    archive?: boolean,
    access?: boolean,
    trustLesson?: boolean,
    testUser?: boolean,
  }) => Promise<void>;
}

const TopMenuPermissions: FC<TopMenuPermissionsProps> = ({
  menu,
  fetchData,
}) => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const SearchDebounce = debounce((e: string) => {
    void fetchData(true, { role: '', search: e });
  }, 1000);

  const {
    searchText,
  }: {
    searchText: ITranslateItemString;
  } = translations.messenger;
  const {
    archiveText,
    allText,
    debtorsText,
    testUsersText,
    archivedTestUsersText
  }: {
    archiveText: ITranslateItemString;
    allText: ITranslateItemString;
    debtorsText: ITranslateItemString;
    testUsersText: ITranslateItemString;
    archivedTestUsersText: ITranslateItemString;
  } = translations.access;


  const renderMenu = (item: ITopMenu) => {
    if (!item.scope) {
      if (item.name === archiveText[language]) {
        return (
          <MenuItemPermissions
            onClick={() => {
              void fetchData(true, { 
                role: '',
                archive: true
              })
            }}
            key={item.id}
            item={item}
          />
        );
      }
      if (item.name === debtorsText[language]) {
        return (
          <MenuItemPermissions
            onClick={() => {
                void fetchData(true, { 
                  role: '',
                  access: false
                }).then(() => {
                  void fetchData(false, { 
                    role: '',
                    trustLesson: true
                  })
                })
            }}
            key={item.id}
            item={item}
          />
        );
      }
      if (item.name === testUsersText[language]) {
        return (
          <MenuItemPermissions
            onClick={() => {
                void fetchData(true, { 
                  role: '',
                  archive: false,
                  testUser: true
                })
            }}
            key={item.id}
            item={item}
          />
        );
      }
      if (item.name === archivedTestUsersText[language]) {
        return (
          <MenuItemPermissions
            onClick={() => {
                void fetchData(true, { 
                  role: '',
                  archive: true,
                  testUser: true
                })
            }}
            key={item.id}
            item={item}
          />
        );
      }
      
      return (
        <MenuItemPermissions
          onClick={() => void fetchData(true, { 
            role: item.path ? item.path : '',
            archive: item.name !== allText[language] ? false : undefined
          })}
          key={item.id}
          item={item}
        />
      )
    }
    return (
      item.scope.includes(user.role) && (
        <MenuItemPermissions
          onClick={() => void fetchData(true, { 
            role: item.path ? item.path : '',
            archive: item.name !== allText[language] ? false : undefined
          }).then(() => {
            if (item.path === 'ADMIN') {
              void fetchData(false, { 
                role: UserRoles.DIRECTOR
              }).then(() => {
                void fetchData(false, { 
                  role: UserRoles.ZDIRECTOR
                })
              })
            }
          })}
          key={item.id}
          item={item}
        />
      )
    )
  }

  return (
    <>
      <div className="py-8 md:py-6 xl:pt-2 xl:bg-[#2c2c2c] w-full relative">
        <div className="flex flex-wrap gap-1 justify-center px-2 items-center">
          {menu &&
            menu.map(renderMenu)}
        </div>
        <div className="w-full  top-3 left-0 px-3 pt-2">
          <Input
            className=""
            onChange={(e: ChangeEvent<HTMLInputElement>) => void SearchDebounce(e.target.value)}
            type="text"
            placeholder={searchText[language]}
          />
      </div>
        </div>
    </>
  );
};

export default TopMenuPermissions;

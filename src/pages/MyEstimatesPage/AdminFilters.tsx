import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "../../hooks/redux";
import { User } from "../../models/User";
import Input from "../../components/UI/Input";
import UsersSearch from "../../components/Widgets/UsersSearch";
import { UserRoles } from "../../utils/userRoles";
import { IEstimate } from "../../models/IEstimate";
import GroupsSearch from "../../components/Widgets/GroupsSearch";
import { IGroup } from "../../models/response/IGroup";

enum Categories {
    AllEst = 'AllEst',
    CommonEst = 'CommonEst',
    TranerEst = 'TranerEst',
    AdministrationEst = 'AdministrationEst'
  }

const categoriesNames = {
  [Categories.AllEst]: {
    ru: "Все отзывы родителей",
    am: "Բոլոր ծնողների գնահատականները",
    en: "All parent reviews",
  },
  [Categories.CommonEst]: {
    ru: "Все отзывы родителей - для всех участников группы",
    am: "Բոլոր ծնողների գնահատականները՝ խմբի բոլոր մասնակիցների համար",
    en: "All parent reviews - for all group members",
  },
  [Categories.TranerEst]: {
    ru: "Все отзывы родителей - для тренера",
    am: "Բոլոր ծնողների գնահատականները՝ մարզչի համար",
    en: "All parent reviews - for the trainer",
  },
  [Categories.AdministrationEst]: {
    ru: "Все отзывы - для ТОЛЬКО администрации школы",
    am: "Բոլոր ծնողների գնահատականները՝ ՄԻԱՅՆ դպրոցի ադմինիստրացիայի համար",
    en: "All reviews - ONLY for the school administration",
  },
};

interface AdminFiltersProps {
  className?: string;
	setCurrentEstimates: (est: IEstimate[]) => void;
	searchQuery: string;
	setSearchQuery: (q: string) => void
}

const AdminFilters:FC<AdminFiltersProps> = ({ className, setCurrentEstimates, setSearchQuery, searchQuery }) => {
	const [categorie, setCategorie] = useState<Categories>(Categories.AllEst);
	const estimates = useAppSelector(state => state.EstimatesSlice.estimates);
	const [tranerSearch, setTranerSearch] = useState<User>(); 
	const [groupSearch, setGroupSearch] = useState<IGroup>(); 
	const [dropdown, setDropDown] = useState<boolean>(false);
	const user = useAppSelector(state => state.UserSlice.user);
	const language = useAppSelector(state => state.TranslateSlice.language);
	useEffect(() => {
			const estFiltered = estimates.filter(
					(est) => !tranerSearch || tranerSearch._id === est.traner._id
			)
      .filter(est => !groupSearch || groupSearch._id === (est.group as unknown as IGroup)._id);
			const getCurrentEstimates = () => {
					switch (categorie) {
					case Categories.AllEst:
						return estFiltered;
					case Categories.CommonEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.parentsCanSee),
						}));
					case Categories.AdministrationEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => !rev.parentsCanSee && !rev.tranerCanSee),
						}));
					case Categories.TranerEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.tranerCanSee),
						}));
					}
			};
			setCurrentEstimates(getCurrentEstimates());
			}, [categorie, setCurrentEstimates, estimates, user._id, tranerSearch, groupSearch]);

  return (
    <div className={classNames('', {}, [className])}>
			<div className="flex gap-2 justify-center flex-wrap">
          {Object.values(Categories).map(cat => (
            <button
              key={cat}
              onClick={() => setCategorie(cat)}
              className={`px-4 py-2 rounded ${categorie === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {categoriesNames[cat][language]}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {
            [Categories.CommonEst, Categories.AdministrationEst, Categories.TranerEst].includes(categorie) &&
            [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&
            <UsersSearch dropdown={dropdown} setDropDown={setDropDown} role={UserRoles.TRANER} placeholder="Найти тренера" onChangeUser={setTranerSearch}/>
          }
          <GroupsSearch className="ml-2" dropdown={dropdown} setDropDown={setDropDown} placeholder="Найти группу" onChangeGroup={setGroupSearch}/>
          <Input
            type="search"
            placeholder="Найти комментарий"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
		</div>
  );
}

export default AdminFilters;
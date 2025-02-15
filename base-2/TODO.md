# Modificați proiectul pentru a adăuga următorul comportament
## Clarificări generale:
- Funcționalitățile care nu pot fi demonstrate nu vor fi luate în considerare
- Acordarea punctajului începe de la 0.5 puncte

## Funcționalitate de filtrare, sortare și paginare pentru componenta de listă a de `users`
### Clarificări
- Adăugați funcționalitate de filtrare, sortare și paginare pentru componenta de listă a de `users`
### Punctaje detaliate
- posibiltiatea de sortare după un câmp - backend(0.25p)
- posibilitatea de sortare după `email` și `type` - frontend(0.25p)
- posibilitatea de filtrare după un câmp - backend(1p)
- posibilitatea de filtrare după `email` și `type` - frontend(0.25p)
- posibilitatea de navigare între pagini - backend (0.25p)
- posibilitatea de navigare între pagini - frontend (0.25p)
- posibilitatea de schimbare a dimensiunii paginii - backend (0.25p)
- posibilitatea de schimbare a dimensiunii paginii - frontend (0.25p)

## Operații pe comentarii
### Clarificări
- Adăugați o nouă entitate `TaskStatus`. `TaskStatus` este o entitate care are un `id`, `label`, `description` și `enabled`. `id` este numeric și reprezintă cheia primară. `label` și `description` sunt string-uri de 255 de caractere. `enabled` este `boolean` și este utilizat în mecanismul de soft delete
- Adăugați funcționalitate de adăugare, editare și ștergere a unui `TaskStatus`
- Ștergerea unui `TaskStatus` va fi o operație soft-delete (ștergere logică). Aceasta constă în schimbarea unui `TaskStatus` enabled în disabled. Un `TaskStatus` care nu este enabled nu poate fi utilizat
- Interfață de adăugare a unui `TaskStatus` este accesibilă din lista de `TaskStatus`
- Rutele de navigare la lista de `TaskStatus` și la adăugarea unui `TaskStatus` trebuie să fie protejate (nu se poate ajunge la ele pentru un utilizator neautentificat)
### Punctaje detaliate
- navigare la lista de taskStatus - frontend (0.25p)
- navigarea la adăugarea unui taskStatus - frontend (0.25p)
- adăugarea unei noi entități `TaskStatus` - backend (0.25p)
- adăugarea unui taskStatus - backend (0.25p)
- adăugarea unui taskStatus - frontend (0.25p)
- editarea unui taskStatus - backend (0.25p)
- editarea unui taskStatus - frontend (0.25p)
- ștergerea unui taskStatus - backend (0.25p)
- ștergerea unui taskStatus - frontend (0.25p)
- controlul accesului la operațiile unui taskStatus - backend (0.25p)
